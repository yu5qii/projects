#include <iostream>
using namespace std;

//POLYMORPHISM: having many forms. When a single function works differently depending on the situation

//Compile-time polymorphism: also called ealy binding and static poly~, decided by the compiler, done through function or operator overloading
//FUNCTION OVERLOADING: two or more func~ have the same name. Can be done by changing number of arguments or the type of argument
//OPERATOR OVERLOADING: providing operators with special meaning for aperticular data type. EX: using + to add numbers but also to join strings

//Run-time polymorphism: also called late binding and synamic polymorphism, implemented using function overriding with virtual functions
//FUNCTION OVERRIDING: when deric=ved class defines one or more member functions of the base class.

//THIS CODE WORKS PERFECTLY FINE IF CLASS MAIN IS RENAMED
class main
{
    public:
        virtual void display()      //virtual function
        {
            cout << "base class function";
        }
};

class derived : public main
{
    public:
        void display() override     //overriding base function with derived class funciton
        {
            cout << "derived class function";
        }
};

int main()
{
    derived object;     //derived class object
    main* mainpoint;     //pointer of type base
    mainpoint = &object;        //pint the base class pointer to derived class object
    mainpoint -> display();
    return 0;
}