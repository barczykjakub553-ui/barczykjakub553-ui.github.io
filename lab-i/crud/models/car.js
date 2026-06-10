let cars = [
  { id: 1, subject: 'Toyota', content: 'Very reliable car', carModel: 'Corolla' },
  { id: 2, subject: 'Honda', content: 'Great performance', carModel: 'Civic' }
];
let nextId = 3;

class Car {
  constructor(data = {}) {
    this.id = data.id || null;
    this.subject = data.subject || null;
    this.content = data.content || null;
    this.carModel = data.carModel || null;
  }

  static findAll() {
    return cars.map(c => new Car(c));
  }

  static find(id) {
    const data = cars.find(c => c.id === parseInt(id));
    return data ? new Car(data) : null;
  }

  save() {
    if (this.id) {
      const index = cars.findIndex(c => c.id === this.id);
      if (index !== -1) {
        cars[index] = {
          id: this.id,
          subject: this.subject,
          content: this.content,
          carModel: this.carModel
        };
      }
    } else {
      this.id = nextId++;
      cars.push({
        id: this.id,
        subject: this.subject,
        content: this.content,
        carModel: this.carModel
      });
    }
  }

  static delete(id) {
    cars = cars.filter(c => c.id !== parseInt(id));
  }
}

module.exports = Car;
