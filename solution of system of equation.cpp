#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

int main()
{
    bool consistancy = true;
    int n;
    cout << "number of euqations: " << endl;
    cin >> n;

    vector<vector<double>> A(n , vector<double>(n+1));
    vector<double> X(n);

    cout << "enter coeffs: " << endl;   //a[i][0] - a[i][n]
    for (int i=0; i<n; i+=1)
    {
        for (int j=0; j<(n+1); j+=1)
        {
            cin >> A[i][j];
        }
    }

    for (int i=0; i<n; i+=1)
    {
        if (A[i][i] == 0.0)
        {
            for (int j=i+1; j<n; j+=1)
            {
                if (A[j][i] != 0)
                {
                    swap(A[i],A[j]);    //I AM DUMB AF 
                }
            }
        }


        for (int k=i+1; k<n; k+=1)
        {
            double ratio = A[k][i] / A[i][i];

            for (int j=0; j<n+1; j+=1)
            {
                A[k][j] -= ratio*A[i][j];
            }
        }
    }

    for (int i=n-1; i>-1; i-=1)
    {
        double sum = 0.0;

        for (int j=i+1; j<n; j+=1)
        {
            sum +=A[i][j]*X[j];
        }

        X[i] = (A[i][n] - sum) / A[i][i];
    }

    cout << "Solution: " << endl;
    for (int i=0; i<n; i+=1)
    {
        cout << X[i] << endl;
    }

    return 0;
}