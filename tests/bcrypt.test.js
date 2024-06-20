const bcrypt = require('bcrypt');

/**
 * https://www.npmjs.com/package/bcrypt#security-issues-and-concerns
 * bcrypt.compare logic only compares first 72 bytes of a string
 */

describe('Check bcrypt compare logic', () => {
  const targetLength = 72;

  test('In case when two different strings are different within 72 length', () => {
    const randomString1 = 'a'.repeat(targetLength - 1) + 'b';
    const randomString2 = 'a'.repeat(targetLength - 1) + 'c';
    expect(randomString1).not.toEqual(randomString2);

    const hashedRandomString1 = bcrypt.hashSync(randomString1, 10);
    const hashedRandomString2 = bcrypt.hashSync(randomString2, 10);
    expect(hashedRandomString1).not.toEqual(hashedRandomString2);

    expect(bcrypt.compareSync(randomString1, hashedRandomString1)).toBe(true);
    expect(bcrypt.compareSync(randomString2, hashedRandomString2)).toBe(true);
    expect(bcrypt.compareSync(randomString1, hashedRandomString2)).toBe(false);
    expect(bcrypt.compareSync(randomString2, hashedRandomString1)).toBe(false);
  });

  test('In case when two different strings are identical within 72 length', () => {
    const randomString1 = 'a'.repeat(targetLength) + 'b';
    const randomString2 = 'a'.repeat(targetLength) + 'c';
    expect(randomString1).not.toEqual(randomString2);

    const hashedRandomString1 = bcrypt.hashSync(randomString1, 10);
    const hashedRandomString2 = bcrypt.hashSync(randomString2, 10);
    expect(hashedRandomString1).not.toEqual(hashedRandomString2);

    expect(bcrypt.compareSync(randomString1, hashedRandomString1)).toBe(true);
    expect(bcrypt.compareSync(randomString2, hashedRandomString2)).toBe(true);
    expect(bcrypt.compareSync(randomString1, hashedRandomString2)).toBe(true);
    expect(bcrypt.compareSync(randomString2, hashedRandomString1)).toBe(true);
  });

  test('In case when comparing two jwts which are different within 72 length', () => {
    const oldRefreshToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXRzaXR0ZXJJZCI6NCwiaWF0IjoxNzE4ODUzMzQ1LCJleHAiOjE3MTk0NTgxNDV9.pzXaZ-9G5i6dFo7yhZy_3qJdmeHJod8XEbLAGnm6ik4';
    const newRefreshToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXRzaXR0ZXIiOjQsImlhdCI6MTcxODg1MzM3MywiZXhwIjoxNzE5NDU4MTczfQ.6X-ZgJCxmA-vX-NyuFwfdBwdqmXt1wuTMHzd3Wn8AGo';

    // hash logic from auth.service.js
    const oldHashedRefreshToken = bcrypt.hashSync(oldRefreshToken, 10);
    const newHashedRefreshToken = bcrypt.hashSync(newRefreshToken, 10);

    // parse string less than 72 bytes
    const parsedOldRefreshToken = oldRefreshToken.substring(0, targetLength - 1);
    const parsedNewRefreshToken = newRefreshToken.substring(0, targetLength - 1);
    expect(parsedOldRefreshToken).not.toBe(parsedNewRefreshToken);

    expect(bcrypt.compareSync(oldRefreshToken, oldHashedRefreshToken)).toBe(true);
    expect(bcrypt.compareSync(newRefreshToken, newHashedRefreshToken)).toBe(true);
    expect(bcrypt.compareSync(oldRefreshToken, newHashedRefreshToken)).toBe(false);
    expect(bcrypt.compareSync(newRefreshToken, oldHashedRefreshToken)).toBe(false);
  });

  test('In case when comparing two jwts which are identical within 72 length', () => {
    const oldRefreshToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MTg4NTUwMTQsImV4cCI6MTcxODg1NjIxNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJJZCI6IjEyMyJ9.owI558wwcHYSCaVjgbNAt4rlPFjifUQKapNLogtgtpk';
    const newRefreshToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MTg4NTQ5ODIsImV4cCI6MTcxODg1NjE4MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJJZCI6IjEyMyJ9.AsCmU-xgWpti1AlpME7NSPZXscoKjlFFLtwB2UvJeHg';

    // hash logic from auth.service.js
    const oldHashedRefreshToken = bcrypt.hashSync(oldRefreshToken, 10);
    const newHashedRefreshToken = bcrypt.hashSync(newRefreshToken, 10);

    // parse string less than 72 bytes
    const parsedOldRefreshToken = oldRefreshToken.substring(0, targetLength - 1);
    const parsedNewRefreshToken = newRefreshToken.substring(0, targetLength - 1);
    expect(parsedOldRefreshToken).toBe(parsedNewRefreshToken);

    expect(bcrypt.compareSync(oldRefreshToken, oldHashedRefreshToken)).toBe(true);
    expect(bcrypt.compareSync(newRefreshToken, newHashedRefreshToken)).toBe(true);
    expect(bcrypt.compareSync(oldRefreshToken, newHashedRefreshToken)).toBe(true);
    expect(bcrypt.compareSync(newRefreshToken, oldHashedRefreshToken)).toBe(true);
  });
});
