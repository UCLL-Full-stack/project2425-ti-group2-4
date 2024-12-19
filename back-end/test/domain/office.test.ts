import { Office } from "../../domain/model/office";

let office: Office;

beforeEach(() => {
    office = new Office({
        name: "Main Office",
        address: "123 Main St",
        email: "office@example.com",
        openingHours: [new Date("1990-05-15T00:00:00Z")],
        phoneNumber: 123456789
    });
});

test('given: valid values for office, when: creating an office, then: office is created with those values', () => {
    // then
    expect(office.getName()).toEqual("Main Office");
    expect(office.getAddress()).toEqual("123 Main St");
    expect(office.getEmail()).toEqual("office@example.com");
    expect(office.getOpeningHours()).toEqual([new Date("1990-05-15T00:00:00Z")]);
    expect(office.getPhoneNumber()).toEqual(123456789);
});

test('given: invalid email for office, when: creating an office, then: throws an error', () => {
    // given
    const invalidOfficeData = {
        name: "Main Office",
        address: "123 Main St",
        email: "invalid-email",
        openingHours: [new Date("1990-05-15T00:00:00Z")],
        phoneNumber: 123456789
    };

    // when
    const createOffice = () => new Office(invalidOfficeData);

    // then
    expect(createOffice).toThrow("Invalid email format.");
});

test('given: valid phone number, when: updating office details, then: phone number is updated successfully', () => {
    // when
    office.setPhoneNumber(9876543210);

    // then
    expect(office.getPhoneNumber()).toEqual(9876543210);
});

test('given: invalid email, when: updating office email, then: throws an error', () => {
    // when
    const setEmail = () => { office.setEmail("invalid-email"); };

    // then
    expect(setEmail).toThrow("Invalid email format.");
});
