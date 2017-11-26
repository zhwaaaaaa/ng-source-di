import 'reflect-metadata'
import {Injector} from "./lib/di/injector";
import {ReflectiveInjector} from "./lib/di/reflective_injector";
import {Injectable} from "./lib/di/metadata";

@Injectable()
class Logger {

    log(msg: any): void {
        console.log(msg);
    }
}

class Person {
    name: string;

    constructor(public logger: Logger) {
    }

    sleep() {
        this.logger.log(`${this.name}在睡觉`);
    }
}

@Injectable()
class Employer {
    name: string;

    constructor(public logger: Logger) {
    }

    work() {
        this.logger.log(`${this.name}在工作`);
    }

    sleep() {
        this.logger.log(`${this.name}在工作中睡觉`);
    }
}
// StaticInjector
(function () {
    let injector: Injector = Injector.create([{provide: Person, useClass: Employer, deps: [Logger]}, {
        provide: Logger,
        deps: [],
        useFactory: (() => {
            console.log("----------------");
            return new Logger();
        }),
    }]);

    let logger: Logger = injector.get<Logger>(Logger);

    let person: Person = injector.get<Person>(Person);
    logger.log(logger === person.logger);

})();

(function () {
    let injector = ReflectiveInjector.resolveAndCreate([Employer, Logger]);
    let emp: Employer = injector.get(Employer);
    let logger: Logger = injector.get(Logger);
    console.log(emp.logger === logger);
})();
