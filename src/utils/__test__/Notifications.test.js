import cron from 'node-cron';
import mockData from './mockData';
import Notifications from '../Notifications';

const {
  notificationType,
  user,
  configuration,
  notification,
  condition
} = mockData;

describe('Notifications', () => {
  describe('Evaluate Predicate', () => {
    it('should process the field required for a health disease', () => {
      const result = Notifications.evaluatePredicate(
        notificationType({
          field: 'healthDiseases'
        }),
        user({}),
        configuration({

        }),
        notification({
          condition: condition({
            field: {
              key: 'profile.healthInformation.currentIllness'
            }
          })
        })
      );
      console.log(result);
    });
  });

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
