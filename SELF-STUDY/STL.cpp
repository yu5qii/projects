//SLT: standard template library, collection of classes and functions.

//COMPONENTS OF STL:
//Containers: data structures used to store objects and data. Implemented as a template class that also contains methods. EX: vector, array.
//Algorithm: defined inside header files but mainly contain methods and functions. EX: algorithm, numeric.
//Iterators: used to point the memory address of STL container. EX: iterator

//ADVANTAGES OF STL:
//saves time and effort
//reliable and tested
//fast and efficient
//reusability
//built-in algorithms

#include <iostream>
#include <string> //container
using namespace std;

int main()
{
    string str;
    getline (cin, str);
    cout << "You entered: " << str;
}