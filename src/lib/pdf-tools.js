import PdfPrinter from "pdfmake";
import imageToBase64 from "image-to-base64";

export const getPDFReadableStream = async (media) => {
  async function createBase64(url) {
    let base64Encoded = await imageToBase64(url);
    return "data:image/jpeg;base64, " + base64Encoded;
  }

  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      {
        text: media.Title,
        style: "header",
      },
      {
        text: media.Year,
        style: "center",
      },
      {
        text: media.Type,
        style: "center",
      },
      {
        image: "posterImg",
        style: "center",
      },
    ],
    images: {
      posterImg: await createBase64(media.Poster),
    },
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: "center",
      },
      center: {
        alignment: "center",
        fontSize: 14,
        margin: [0, 10],
      },
    },
  };

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition);
  pdfReadableStream.end();
  return pdfReadableStream;
};
