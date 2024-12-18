import { faker } from "@faker-js/faker";

const priorities = ["Low", "Medium", "High"];
const statuses = ["Open", "In Progress", "Resolved", "Closed"];

function generateTicket() {
  return {
    id: faker.string.uuid(),
    subject: faker.lorem.sentence({ min: 1, max: 2 }),
    priority: faker.helpers.arrayElement(priorities),
    status: faker.helpers.arrayElement(statuses),
    description: faker.lorem.paragraph({ min: 1, max: 3 }),
    assignedTo: faker.person.fullName(),
    createdAt: faker.date.past().toISOString(),
  };
}

function generateTickets(count: number) {
  const tickets = [];
  for (let i = 0; i < count; i++) {
    tickets.push(generateTicket());
  }
  return tickets;
}

const tickets = generateTickets(20000);

export default tickets;
