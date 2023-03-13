//@ts-ignore
import { REDIRECT_DOMAIN } from "../../config/keys.js";

/**
 * Survey template to be used by Mailer.
 * @param body The body of the survey.
 * @returns The HTML template.
 */
const surveyTemplate = ({ body, id }: { body?: string; id: string }) =>
  `<html>
  <body>
    <div style="text-align: center;">
      <h3>I'd like your input!</h3>
      <p>Please answer the following question:</p>
      <p>${body}</p>
      <div>
        <a href="${REDIRECT_DOMAIN}/api/surveys/${id}/yes">Yes</a>
      </div>
      <div>
        <a href="${REDIRECT_DOMAIN}/api/surveys/${id}/no">No</a>
      </div>
    </div>
  </body>
  </html>`;
// The hrefs endpoints allows us to track user clicks, and
// the survey id allows us to track which survey the user clicked on, and
// the yes/no allows us to track which link the user clicked on.
export default surveyTemplate;
