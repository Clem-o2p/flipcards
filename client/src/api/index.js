import { GoogleSpreadsheet } from "google-spreadsheet";
import settings from "../settings/spec";

export const fetchCards = () => {
  return new Promise((resolve, reject) => {
    const doc = new GoogleSpreadsheet(settings.spreadsheetAPI.sheetId);

    doc.useApiKey(settings.spreadsheetAPI.apiKey);

    doc
      .loadInfo()
      .then(() => {
        const sheet = doc.sheetsByIndex[0];
        sheet
          .getRows()
          .then((rows) => {
            resolve(rows);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
