//@ts-ignore
import { REDIRECT_DOMAIN } from "../../config/keys.js";

/**
 * Survey template to be used by Mailer.
 * @param body The body of the survey.
 * @returns The HTML template.
 */
const surveyTemplate = ({ body }: { body?: string }) =>
  `<html>
  <body>
    <div style="text-align: center;">
      <h3>I'd like your input!</h3>
      <p>Please answer the following question:</p>
      <p>${body}</p>
      <div>
        <a href="${REDIRECT_DOMAIN}/api/surveys/responded">Yes</a>
      </div>
      <div>
        <a href="${REDIRECT_DOMAIN}/api/surveys/responded">No</a>
      </div>
    </div>
  </body>
  </html>`;

export default surveyTemplate;
