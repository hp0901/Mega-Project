exports.welcomeEmail = (firstname, lastname, email) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Welcome to StudyNotion!</title>
      <style>
          body {
              background-color: #f4f4f4;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.6;
              color: #333333;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 30px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              text-align: center;
          }
  
          .logo {
              max-width: 180px;
              margin-bottom: 25px;
          }
  
          .header {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 15px;
              color: #1a2a4a; 
          }
  
          .body {
              font-size: 16px;
              margin-bottom: 30px;
              text-align: left;
          }
  
          .cta {
              display: inline-block;
              padding: 12px 25px;
              background-color: #FFD60A;
              color: #000000;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              font-weight: bold;
              margin-top: 10px;
              margin-bottom: 30px;
          }
  
          .support {
              font-size: 14px;
              color: #888888;
              margin-top: 20px;
          }
  
          .highlight {
              font-weight: bold;
              color: #0056b3;
          }
      </style>
  
  </head>
  
  <body>
      <div class="container">
          <a href="https://studynotion-edtech-project.vercel.app"><img class="logo"
                  src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
          <div class="header">Your New Journey Begins!</div>
          <div class="body">
              <p>Hi ${firstname} ${lastname},</p>
              <p>Welcome to StudyNotion! We are absolutely thrilled to have you join our community. This marks the beginning of an exciting adventure in learning and growth, and we can't wait to see what you'll achieve.</p>
              <p>Your account has been successfully created. Here are the details you provided:</p>
              <p><strong>Name:</strong> ${firstname} ${lastname}</p>
              <p><strong>Email:</strong> <span class="highlight">${email}</span></p>
              <p>You're all set to dive in and explore everything we have to offer. Let's get started!</p>
          </div>
          <a href="[Your-Dashboard-Link-Here]" class="cta">Go to Your Dashboard</a>
          <div class="support">If you have any questions or need a hand getting started, please don't hesitate to reach
              out to us at <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We're here to help!</div>
      </div>
  </body>
  
  </html>`;
};
