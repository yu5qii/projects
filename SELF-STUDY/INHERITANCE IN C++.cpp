#include <iostream>
using namespace std;

//Inheritance is the mechanism by which a class inherites features of other classes.
//TYPES OF INHERITANCE: 
//Single:sub-class is derived from only one base class
//Multiple: class has more than one baseclasses
//Multilevel: a class is derived from a class that is a sub-class of another class
//Hierarchical: more than one sub-class is inherited from the same base class
//Hybrid: when different types of inheritances are combines

class machine       //Base case with function work
{
    public:
        void work()
        {
            cout << "all machines do some work" << endl;
        }
};

class chores        //Base case with function task
{
    public:
        void task()
        {
            cout << "some household chore is done" << endl;
        }
};

class car : public machine      //simple inheritance derived class
{
    public:
        void work()
        {
            cout << "car drives" << endl;
        }
};

class honda : public car        //multilevel inheritance class
{
    public:
        honda()
        {
            cout << "honda makes cars that are machines" << endl;
        }
};

class washing_machine : public machine, public chores      //multiple inheritance class
{
    public:
        void workandtask()
        {
            cout << "washing machine washes clothes" << endl;
        }
};

int main()
{
    car ferrari;
    ferrari.work();

    washing_machine godrej;
    godrej.workandtask();
    godrej.work();
    godrej.task();

    honda city;

    return 0;
}