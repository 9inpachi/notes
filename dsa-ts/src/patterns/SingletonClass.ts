
class SingletonClass {
  /** A single instance of the class */
  static instance: SingletonClass;
  /** ID of the instance */
  instanceID: number;
  /** Get the instance of the class */
  getInstance: () => SingletonClass;
  
  /** Some test property for the Singleton Class */
  someProperty: string;

  /**
   * Initialize the Singleton Class object.
   * @param value Some value.
   */
  init(value: number) {
    this.instanceID = value;
    this.getInstance = () => SingletonClass.instance;
    return this;
  }

  /**
   * Constructor for the Singleton Class to avoid multiple instances.
   * @param value Some value.
   */
  constructor(value: number) {
    if (SingletonClass.instance === undefined) {
      SingletonClass.instance = this.init(value);
    } else {
      // If we want to throw error. That is to not allow another instance at all.
      // throw new Error('NOT ALLOWED TO CREATE ANOTHER INSTANCE');
    }
    return SingletonClass.instance;
  }

  /**
   * Set some property of the object.
   * @param someValue Some property value.
   */
  setProperty(someValue: string) {
    this.someProperty = someValue;
  }
}

const object1 = new SingletonClass(10);
const object2 = new SingletonClass(20);
const object3 = new SingletonClass(30);
const object4 = new SingletonClass(40);

console.assert(object1.getInstance() === object2.getInstance(), 'Wrong implementation');
console.assert(object2.instanceID === object3.instanceID, 'Wrong implementation');

object3.setProperty('Test Value');
object4.setProperty('Test Value');
console.assert(object3.someProperty === object4.someProperty, 'Wrong implementation');

console.assert(object3 === object4, 'Wrong implementation');
