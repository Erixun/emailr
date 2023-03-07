import sendGrid, { mail as helper } from "sendgrid";
import dotenv from "dotenv";
dotenv.config();
const { SEND_GRID_KEY } = process.env;
if (!SEND_GRID_KEY) throw Error("ERROR - Sendgrid key is undefined");

type ListRecipients = Array<{ email?: string; responded: boolean }>;
const { Mail } = helper;

// Sendgrid scans each email,
// replacing each link with their own.
// They know the recipient of every email and links injected
// into an email contains a token to identify the user.

//Link-click effect:
// 1. User gets sent to their destination.
// 2. Sendgrid sends msg to our server informing us of the click.

/**
 * Mailer class to be used by surveyRoutes. Based on Sendgrid's Mail class.
 * @param subject The subject of the email.
 * @param recipients The recipients of the email.
 * @param content The content of the email.
 */
class Mailer extends Mail {
  from_email;
  subject;
  body;
  recipients;
  sendGridApi;
  constructor(
    { subject, recipients }: { subject?: string; recipients?: ListRecipients },
    content: string
  ) {
    super();
    this.sendGridApi = sendGrid(SEND_GRID_KEY!);
    this.from_email = new helper.Email("emailr.servant@gmail.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients?: ListRecipients) {
    if (!recipients) throw Error("Recipients are undefined");
    return recipients.map(({ email }: { email?: string }) => {
      if (!email) throw Error("Email undefined");
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sendGridApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON(),
    });

    const response = await this.sendGridApi.API(request);
    return response;
  }
}

export default Mailer;
