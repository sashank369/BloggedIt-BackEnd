const request = require('supertest');
const index = require('./index');
const mongoose = require("mongoose");


// Replace the following URL with your actual API endpoint
const API_URL = '/blogs';

// Test data for createBlog
const testData = {
  title: 'Test Blog',
  message: 'This is a test blog post.',
  name: 'Test Author',
  tags: ['test', 'jest'],
  selectedFile: 'test-file.jpg',
};

describe('POST /blogs', () => {
  beforeAll(async () => {
    // Connect to a test database or use a separate one
    await mongoose.connect('mongodb+srv://rithvikramasani:rithvikramasani@cluster0.sgvjxgt.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await mongoose.connection.close();
  });

  it('should create a new blog', async () => {
    // Send a POST request to create a new blog
    const response = await request(app)
      .post(API_URL)
      .send(testData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201); // Expecting a 201 Created status

    // Check if the response body matches the expected data
    expect(response.body).toEqual(expect.objectContaining(testData));

    // Optionally, you can store the created blog ID for later use in other tests
    const createdBlogId = response.body._id;
    // You might want to clear or reset the test data in your database after this test
  });

  // Add more test cases as needed
});
