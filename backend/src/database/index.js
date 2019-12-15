import Sequelize from 'sequelize';

import DataBaseConfig from '../config/database';

import Image from '../app/models/Image';
import Question from '../app/models/Question';
import Answer from '../app/models/Answer';
import User from '../app/models/User';
import Person from '../app/models/Person';
import Event from '../app/models/Event';

const models = [Image, Question, Answer, User, Person, Event];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(DataBaseConfig);

    models.map(model => model.init(this.connection));

    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
