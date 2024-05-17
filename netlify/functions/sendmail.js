const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.NETLIFY_EMAILS_PROVIDER_API_KEY)

exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)
  const { name, firmName, phoneNumber, email, subject, message } = data

  if (name === "" || subject === "" || email === "" || message === "") {
    return {
      statusCode: 500,
      body: "Empty data",
    }
  }

  const body = `<h4>Imię i nazwisko: ${name}<h4>
      <h4>Email: ${email}<h4>
      <h4>Firma: ${firmName !== "" ? firmName : "Nie podano"}<h4>
      <h4>Numer telefonu: ${phoneNumber !== "" ? phoneNumber : "Nie podano"}<h4>
      <h4>Temat: ${subject}<h4>
      <h4>Wiadomość: ${message}<h4>
  `

  const mail_to_send = {
    to: "kontakt@medicos.com.pl",
    from: "kontakt@medicos.com.pl",
    subject: subject,
    html: body,
  }

  try {
    await sgMail.send(mail_to_send)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: e.message,
      }),
    }
  }
}
