
import java.util.Scanner;
class Area
{
   public static void main(String args[]) 
    {   
       
      Scanner s= new Scanner(System.in);
        
         System.out.println("enter the base:");
         double base= s.nextDouble();
 
         System.out.println("enter height:");
         
          double height= s.nextDouble();
          
      double area=(base*height)/2;
      System.out.println("Area of Triangle is: " + area);
      System.out.println();

      System.out.println("enter length:");

      double length= s.nextDouble();

      System.out.println("enter width:");

      double width= s.nextDouble();
       area=length * width;

       System.out.println("area of a lectangle:" + area);
   }
}