#include <iostream>
#include <string>
using namespace std;

//CLASS: a user-defined blueprint. Represents the set of properties* or methods* that are comon to all objects of that class 
//Acess specifiers: public, private or protected

//OBJECT: basic unit of OOP that represents real life entities.
//State: reflects the properties of object
//member function: collection of statements that perform a task
//Behaviour: reflects the response of an object to other objects
//Identity: unique name or reference given to an object

//ABSTRACTION: hiding the details and only showing essential details to the user. Focuses on what an objet does rather than how it does. This is done using abstract classes
//Abstract classes: pure virtual class, serves as blueprin tfor other derived classes. You cannot create direct objects of an abstract class

class student 
{

    private:        //defining variable of the class
        string name;
        float marks;

    public: 
        //constructor: takes in the values from user and stores in class variables
        student(string name, float marks)
        {
            this -> name = name;        //this-> is a pointer for non-static member functions, holds the memory address of current object
            this -> marks = marks;      //this->marks is a member variable and marks is a parameter
        }

        //getter methods: also known as accessor, public member function designed to retrieve value of private or protected data
        string getname()
        {
            return name;
        }
        float getmarks()
        {
            return marks;
        }

        //setter methods: also known as mutator, used to set or modify value of private data member
        void setname(string name)
        {
            this -> name = name;
        }
        void setmarks(float marks)
        {
            this -> marks = marks;
        }

        //instance methods: has implicit access to object's data
        void display()
        {
            cout << "student name: " << name << endl;
            cout << "marks: " << name << endl;
        }
};      //NOTE that class has to terminate with ;

int main()
{
    student s1("naman", 87.00);     //defined at the time of calling
    s1.display();

    string name;        //taking values from user
    float marks;
    cout << "enter your name: "; 
    cin >> name;
    cout << "enter your marks: ";
    cin >> marks;
    student s2(name, marks);
    s2.display();

    return 0;
}
