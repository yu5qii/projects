#include <iostream>
using namespace std;

//ABSTRACTION: displaying only essential information about the data and ignoring the intername details 
//TYPES OF ABSTRACTION:
//1. Bata abstraction: only shows required information about the data
//2. Control abstraction: only shows the required info~ about the implimentation 
//USING ACCESS SPECIFIERS: used to enforce restrictions on class memebers
//public members can be access from anywhere in the program, private members can only be access from within the class

//ABSTRACTION USING ABSTRACT KEYWORD (using pure virtual functions)

//FUNCTION OVERLOADING
class impabs
{
    private:
        int a, b;

    public:
        void set (int x, int y)
        {
            a = x;
            b = y;
        }

        void display()
        {
            cout << a << endl;
            cout << b << endl;
        }
};

int main()
{
    impabs object;
    int a, b;
    cin >> a >> b;
    object.set(a, b);
    object.display();

    return 0;
}

