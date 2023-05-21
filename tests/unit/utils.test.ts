import { secondsToHMS, isoDateTimeToDate } from '../../src/utils/datetime'
import { formatParams } from '../../src/utils/url'


describe('test isoDateTimeToDate', function() {
  it('should translate iso_date to Date', function(done) {
      const iso_date = "20200220T170000";
      const date = isoDateTimeToDate(iso_date);
      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2020);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(20);
      expect(date.getHours()).toBe(17);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      done();
  })
})

describe('test secondsToHMS', function() {
  it('should translate seconds to HMS', function(done) {
      const seconds = 3600;
      const hms = secondsToHMS(seconds);
      expect(hms).toBe("1h 0m 0s");
      done();
  })
})

describe('test formatParams', function() {
  it('should format params', function(done) {
    const params = {
      from: "stop_area:OCE:SA:87686006",
      to: "stop_area:OCE:SA:87686006",
    }
    const formattedParams = formatParams(params);
    expect(formattedParams).toBe("from=stop_area:OCE:SA:87686006&to=stop_area:OCE:SA:87686006");
    done();
  })
})