import cron from 'node-cron';
import Notifications from '../Notifications';


describe('Notifications', () => {
  describe('Cron Patterns', () => {
    it('should create the daily cron pattern', () => {
      const result = Notifications.createCronPattern('frequency', {
        frequency: 'daily',
        time: '23:59',
        notificationType: {
          alert: 'frequency'
        }
      });
      expect(result).toEqual('59 23 * * *');
      expect(cron.validate(result)).toBeTruthy();
    });

    it('should create the weekly cron pattern', () => {
      const result = Notifications.createCronPattern('frequency', {
        frequency: 'weekly',
        time: '21:00',
        weekDay: 'sunday',
        notificationType: {
          alert: 'frequency'
        }
      });
      expect(result).toEqual('0 21 * * sunday');
      expect(cron.validate(result)).toBeTruthy();
    });

    it('should create the monthly cron pattern', () => {
      const result = Notifications.createCronPattern('frequency', {
        frequency: 'monthly',
        day: 21,
        notificationType: {
          alert: 'frequency'
        }
      });
      expect(result).toEqual('0 0 21 * *');
      expect(cron.validate(result)).toBeTruthy();
    });

    it('should create the yearly cron pattern', () => {
      const result = Notifications.createCronPattern('frequency', {
        frequency: 'yearly',
        month: 'february',
        day: 12,
        notificationType: {
          alert: 'frequency'
        }
      });

      expect(result).toEqual('0 0 12 february *');
      expect(cron.validate(result)).toBeTruthy();
    });
  });
});
