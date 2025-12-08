#include <iostream>
using namespace std;

class complex
{
    public:
        int real, imag;
        
        complex (int r, int i):
        real(r), imag(i) {}

        //overloading + operator
        complex operator+(const complex& obj)
        {
            return complex(real + obj.real, imag + obj.imag);
        }
};

int main()
{
    int r1, i1, r2, i2;

    cout << "ENTER COORDENATES OF Z1: ";
    cin >> r1 >> i1;

    cout << "ENTER COORDINATES OF Z2: ";
    cin >> r2 >> i2;

    complex c1(r1, i1), c2(r2, i2);

    complex c3 = c1 + c2;
    cout << c3.real << " + i" << c3.imag;
    return 0;
}