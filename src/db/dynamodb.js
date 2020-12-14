const { DynamoDB } = require('aws-sdk');

class DynamoDB {
  /**
   * @param {String} apiVersion latest, 2015-03-31, 2012-08-10 (default), 2011-12-05
   * @param {String} region us-east-1 (default)
   */
  constructor(apiVersion = '2012-08-10', region = 'us-east-1') {
    this.dynamodb = new AWS.DynamoDB.DocumentClient({
      apiVersion,
      region,
    });
  }

  /**
   * Creates an item for specified TableName with Item.
   * @param {Object} params required keys: TableName, Item
   */
  create(params) {
    return new Promise((resolve, reject) => {
      this.dynamodb.put(params, (err, data) => {
        if (err) return reject(err);

        return resolve(data);
      });
    });
  }

  /**
   * Gets all items that match the condition.
   * @param {Object} params required keys: TableName, KeyConditionExpression, ExpressionAttributeValues
   * @returns {Promise} Promise resolves to an object. Items that match are contained in the key 'Items'.
   */
  get(params) {
    return new Promise((resolve, reject) => {
      this.dynamodb.query(params, (err, data) => {
        if (err) return reject(err);

        return resolve(data);
      });
    });
  }

  /**
   * Gets an item that matches the condition.
   * @param {Object} params required keys: TableName, Key
   * @returns {Object} Promise resolves to an object. Items that match are contained in the key 'Item'.
   */
  getItem(params) {
    return new Promise((resolve, reject) => {
      this.dynamodb.get(params, (err, data) => {
        if (err) return reject(err);

        return resolve(data);
      });
    });
  }

  /**
   * Scans the entire table.
   * @param {Object} params required keys: TableName
   * @returns {Object} Promise resolves to an object. Items that match are contained in the key 'Items'.
   */
  scan(params) {
    return new Promise((resolve, reject) => {
      this.dynamodb.scan(params, (err, data) => {
        if (err) return reject(err);

        return resolve(data);
      });
    });
  }

  /**
   * Updates a single item with the specified expression.
   * @param {Object} params required keys: TableName, Key, UpdateExpression, ExpressionAttributeValues
   * @returns {Promise} Promise resolves to entire updated item
   */
  update(params) {
    return new Promise((resolve, reject) => {
      params.ReturnValues = 'ALL_NEW';

      this.dynamodb.update(params, (err, data) => {
        if (err) return reject(err);

        return resolve(data);
      });
    });
  }

  /**
   * Removes a single item from the table.
   * @param {Object} params required keys: TableName, Key
   * @returns {Promise} success or failure of deleting
   */
  remove(params) {
    return new Promise((resolve, reject) => {
      this.dynamodb.delete(params, (err, data) => {
        if (err) return reject(err);

        return resolve(data);
      });
    });
  }
}

module.exports = { DynamoDB };
