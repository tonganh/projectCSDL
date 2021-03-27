#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define maxLenghInString 100
#define MAXLINE 20
#define LINELENGHTLIMIT 40

int PrintLine(char *strLine, int nLength, unsigned char ResulstHex[]);
bool ParseHexLine(unsigned char *strLine, int nLength);
int count = 0;
char continous = 'n';
int countLine = 0;
int getVal(char c);
void printValue(char *addValue);
unsigned char ResulstHex[maxLenghInString], nHexLength;

const char *getFileName(char *filename)
{
   const char *dot = strrchr(filename, '.');
   if (!dot || dot == filename)
      return "";
   return dot + 1;
}
void clear()
{
   system("cls"); 
}

//
int main(int argc, char *argv[])
{
   int num;
   FILE *fptr = fopen(strLogFile, "r");

   char strLogFile[maxLenghInString] = "Uart.X.production.hex";

   unsigned char strLine1[maxLenghInString];
   int count = 0;

   int line = 0;

   if (argc != 2)
   {
      fprintf(stderr, " Application alowed 1 arguments: %s \n", argv[0]);
      exit(1);
   }
   else
      strcpy(strLogFile, argv[1]);

   if (fptr == NULL)
   {
      printf("Error: %s could not be opened. ", strLogFile);
      exit(1);
   }
   else if (strcmp(getFileName(strLogFile), "hex") != 0)
   {
      printf("File must be .hex");
      exit(1);
   }

   while (fgets(strLine1, maxLenghInString, fptr) != NULL)
   {

      nHexLength = PrintLine(strLine1, strlen(strLine1), ResulstHex);

      bool bTest = ParseHexLine(ResulstHex, nHexLength);
   }

   if (feof(fptr))
   {
      printf("\nRead to the end of file : %s", strLogFile);
   }
   else
   {
      printf("\nThe line is too long in File : %s", strLogFile);
   }

   fclose(fptr);

   return 0;
}

int PrintLine(char *strLine, int nLength, unsigned char ResulstHex[])
{
   int k = 0;
   int countInArr = 0;
   unsigned char c1, c2, sum;
   char dataVal[16];
   if (strLine[0] != ':')
      return 0;

   int i = 9, j = 0;

   char output[16];
   int len = strlen(strLine);
   char hex_str[(len * 2) + 1];
   while (i < nLength - 3) 
   {

      if (countLine > 25)
      {
         printf("Continous print?(y\\n)");
         scanf("%s", &continous);
         if (continous == 'n')
         {
            exit(1);
         }
         else
         {
            countLine = 0;
            clear();
         }
      }

      if ((strLine[1] == '0' && strLine[2] == '2'))
      {

         break;
      }
      c1 = getVal(strLine[i++]);
      c2 = getVal(strLine[i++]);

      sum = c1 << 4 | c2;
      ResulstHex[j++] = sum;
      hex_str[j] = sum;
      printf(" %02x", sum);
      if (count == 16)
      {
         for (int i = 0; i < len; i++)
         {
            printf(" %c", hex_str[i]);
         }
         printf("\n ");

         countLine++;
         count = 0;
      }
      count++;
   }
   if (count == 16)
   {
      for (int i = 0; i < len; i++)
      {
         printf(" %c", hex_str[i]);
      }
      printf("\n ");
      countLine++;
      count = 0;
   }

   return j;
}

int getVal(char c)
{
   int value = 0;

   if (c >= '0' && c <= '9')
   {
      value = c - '0';
   }
   else
   {
      value = c - 'a' + 10;
   }

   return value;
}

bool ParseHexLine(unsigned char *strLine, int nLength)
{
   int data_index = 0;
   unsigned char char_to_put;

   unsigned char nData[maxLenghInString];

   unsigned char nByteCount;
   unsigned char nHighAddress;
   unsigned char nLowAddress;
   unsigned int nAddress;
   unsigned char nRecordType;
   unsigned char nCheckSum;


   nByteCount = strLine[0];

   if (nByteCount == 0)
      return false;

   nHighAddress = strLine[1];

   nLowAddress = strLine[2];

   nRecordType = strLine[3];

   // if !=0 => out.
   if (nRecordType != 0)
      return false;

   nAddress = ((unsigned int)nHighAddress << 8) | nLowAddress;

   while (data_index < nByteCount)
   {
      nData[data_index] = strLine[4 + data_index];
      data_index++;
   }

   nCheckSum = strLine[nLength - 1];

   return true;
}