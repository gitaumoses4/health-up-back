import { Browser } from './mock';

const admin = new Browser({
  email: 'admin@healthupsa.com',
  password: 'password'
});

const browser = new Browser({
  email: 'gitaumoses4@gmail.com',
  password: 'password',
  name: 'Moses Gitau'
});

describe('Frequency Notifications', () => {
  beforeAll(async () => {
    await browser.login();

    // update profile
    await browser.put('/profile', {
      healthInformation: {
        familyHistory: {
          bloodDiseases: true
        }
      }
    });

    // admin to create notification for blood diseases
    await admin.login();
    await admin.put('/notificationBuilder/types/1', {
      text: 'Send this to the user',
      condition: 1,
      configuration: {}
    });
  });

  it('should contain atleast one test', () => {
    
  });
});
