/* This example may only be used in a POSIX program.  */
#include <stdlib.h>

int main(void)
{
    int result;

    result = system("date | tee result.log");
}
