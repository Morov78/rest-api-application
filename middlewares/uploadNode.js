const path = require("path");
const fs = require("fs");

const tempDir = path.join(process.cwd(), "tmp");

const getBoundary = (req) => {
  const contentType = req.headers["content-type"];
  const contentTypeArray = contentType.split(";").map((item) => item.trim());

  const boundaryPrefix = "boundary=";

  let boundary = contentTypeArray.find((item) =>
    item.startsWith(boundaryPrefix)
  );

  if (!boundary) return null;
  boundary = boundary.slice(boundaryPrefix.length);

  if (boundary) boundary = boundary.trim();
  return boundary;
};

const getMatch = (data, regex) => {
  const result = data.match(regex);
  if (result) return result[1].trim();
};

const uploadNode = async (req, _, next) => {
  try {
    const [contentType] = req.headers["content-type"].split(";");

    if (contentType === "multipart/form-data") {
      //   // Use latin1 encoding to parse binary files correctly
      req.setEncoding("latin1");
    }

    const boundary = getBoundary(req);

    let rawData = "";

    await req.on("data", (chunk) => {
      rawData += chunk;
    });

    await req.on("end", async () => {
      const rawDataArray = rawData.split(boundary);

      let resultBody = {};
      let resultFile;

      for (const item of rawDataArray) {
        const name = getMatch(item, /(?:name=")(.+?)(?:")/);

        if (!name) continue;

        const value = getMatch(item, /(?:\r\n\r\n)([\S\s]*)(?:\r\n--$)/);

        if (!value) continue;

        const filename = getMatch(item, /(?:filename=")(.*?)(?:")/);

        if (!filename) {
          resultBody = { ...resultBody, [name]: value };

          continue;
        }

        const contentType = getMatch(item, /(?:Content-Type:)(.*?)(?:\r\n)/);

        if (!contentType) continue;

        const pathFile = path.join(tempDir, filename);

        const stream = fs.createWriteStream(pathFile);
        await stream.write(value, "binary");
        stream.close();

        resultFile = { filename, path: pathFile };
      }

      req.body = resultBody;
      req.file = resultFile;

      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = uploadNode;
