# Phones API

To run the api use the following command: `npm run start`

For develoment environment: `npm run start:dev`

Also you can mount the docker image using: `docker-compose up`

The application will run on port 2512.

## API

GET /phones: Retrieve all the phones stored

GET /phones/{id}: Retrieve one phone, given the id in the path (example /phones/1)

POST /phones: Create a new phone

PATCH /phones: Modify a phone

DELETE /phones: Delete a phone

## Phone model

- name
- price
- imageFileName (by default goes with Iphone SE.png value)
- description
- manufacturer
- color
- screen
- processor
- ram
