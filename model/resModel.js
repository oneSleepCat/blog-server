class ResModel {
  constructor(params) {
    const { data = null, message = '' } = params;
    this.data = data;
    this.message = message;
  }
}

class SuccessModel extends ResModel {
  constructor(params) {
    super(params);
    this.errno = 0;
  }
}

class ErrorModel extends ResModel {
  constructor(params) {
    super(params);
    this.errno = -1;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
