import cron from 'node-cron';
import Notifications from './Notifications';

describe('Notifications', () => {
  describe('Frequency based notifications', () => {

  });

  describe('Cron Patterns', () => {
    it('should create the daily cron pattern', () => {
      const result = Notifications.createCronPattern({ frequency: 'daily', time: '23:59:00' });
      expect(result).toEqual('59 23 * * *');
      expect(cron.validate(result)).toBeTruthy();
    });

    it('should create the weekly cron pattern', () => {
      const result = Notifications.createCronPattern({
        frequency: 'weekly',
        time: '21:00:00',
        weekDay: 'sunday'
      });
      expect(result).toEqual('0 21 * * sunday');
      expect(cron.validate(result)).toBeTruthy();
    });

    it('should create the monthly cron pattern', () => {
      const result = Notifications.createCronPattern({
        frequency: 'monthly',
        day: 21
      });
      expect(result).toEqual('0 0 21 * *');
      expect(cron.validate(result)).toBeTruthy();
    });

    it('should create the yearly cron pattern', () => {
      const result = Notifications.createCronPattern({
        frequency: 'yearly',
        month: 'february',
        day: 12
      });

      expect(result).toEqual('0 0 12 february *');
      expect(cron.validate(result)).toBeTruthy();
    });
  });
});
