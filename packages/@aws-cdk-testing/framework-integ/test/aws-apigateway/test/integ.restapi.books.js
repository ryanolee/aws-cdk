"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lambda = require("aws-cdk-lib/aws-lambda");
const cdk = require("aws-cdk-lib");
const integ_tests_alpha_1 = require("@aws-cdk/integ-tests-alpha");
const apigw = require("aws-cdk-lib/aws-apigateway");
class BookStack extends cdk.Stack {
    constructor(scope, id) {
        super(scope, id);
        const booksHandler = new apigw.LambdaIntegration(new lambda.Function(this, 'BooksHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'index.handler',
            code: lambda.Code.fromInline(`exports.handler = ${echoHandlerCode}`),
        }));
        const bookHandler = new apigw.LambdaIntegration(new lambda.Function(this, 'BookHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'index.handler',
            code: lambda.Code.fromInline(`exports.handler = ${echoHandlerCode}`),
        }));
        const hello = new apigw.LambdaIntegration(new lambda.Function(this, 'Hello', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'index.handler',
            code: lambda.Code.fromInline(`exports.handler = ${helloCode}`),
        }));
        const api = new apigw.RestApi(this, 'books-api', { cloudWatchRole: true });
        api.root.addMethod('ANY', hello);
        const books = api.root.addResource('books', {
            defaultIntegration: booksHandler,
            defaultMethodOptions: { authorizationType: apigw.AuthorizationType.IAM },
        });
        books.addMethod('GET');
        books.addMethod('POST');
        const book = books.addResource('{book_id}', {
            defaultIntegration: bookHandler,
            // note that authorization type is inherited from /books
        });
        book.addMethod('GET');
        book.addMethod('DELETE');
    }
}
const app = new cdk.App();
const testCase = new BookStack(app, 'restapi-books-example');
new integ_tests_alpha_1.IntegTest(app, 'restapi-books', {
    testCases: [testCase],
});
function echoHandlerCode(event, _, callback) {
    return callback(undefined, {
        isBase64Encoded: false,
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(event),
    });
}
function helloCode(_event, _context, callback) {
    return callback(undefined, {
        statusCode: 200,
        body: 'hello, world!',
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcucmVzdGFwaS5ib29rcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVnLnJlc3RhcGkuYm9va3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBaUQ7QUFDakQsbUNBQW1DO0FBQ25DLGtFQUF1RDtBQUN2RCxvREFBb0Q7QUFFcEQsTUFBTSxTQUFVLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDL0IsWUFBWSxLQUFjLEVBQUUsRUFBVTtRQUNwQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sWUFBWSxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3pGLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixlQUFlLEVBQUUsQ0FBQztTQUNyRSxDQUFDLENBQUMsQ0FBQztRQUVKLE1BQU0sV0FBVyxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3ZGLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixlQUFlLEVBQUUsQ0FBQztTQUNyRSxDQUFDLENBQUMsQ0FBQztRQUVKLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQzNFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixTQUFTLEVBQUUsQ0FBQztTQUMvRCxDQUFDLENBQUMsQ0FBQztRQUVKLE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDM0UsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWpDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUMxQyxrQkFBa0IsRUFBRSxZQUFZO1lBQ2hDLG9CQUFvQixFQUFFLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtTQUN6RSxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFeEIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUU7WUFDMUMsa0JBQWtCLEVBQUUsV0FBVztZQUMvQix3REFBd0Q7U0FDekQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Q0FDRjtBQUVELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRTFCLE1BQU0sUUFBUSxHQUFHLElBQUksU0FBUyxDQUFDLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0FBQzdELElBQUksNkJBQVMsQ0FBQyxHQUFHLEVBQUUsZUFBZSxFQUFFO0lBQ2xDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztDQUN0QixDQUFDLENBQUM7QUFFSCxTQUFTLGVBQWUsQ0FBQyxLQUFVLEVBQUUsQ0FBTSxFQUFFLFFBQWE7SUFDeEQsT0FBTyxRQUFRLENBQUMsU0FBUyxFQUFFO1FBQ3pCLGVBQWUsRUFBRSxLQUFLO1FBQ3RCLFVBQVUsRUFBRSxHQUFHO1FBQ2YsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFO1FBQy9DLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztLQUM1QixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsTUFBVyxFQUFFLFFBQWEsRUFBRSxRQUFhO0lBQzFELE9BQU8sUUFBUSxDQUFDLFNBQVMsRUFBRTtRQUN6QixVQUFVLEVBQUUsR0FBRztRQUNmLElBQUksRUFBRSxlQUFlO0tBQ3RCLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgSW50ZWdUZXN0IH0gZnJvbSAnQGF3cy1jZGsvaW50ZWctdGVzdHMtYWxwaGEnO1xuaW1wb3J0ICogYXMgYXBpZ3cgZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXknO1xuXG5jbGFzcyBCb29rU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkFwcCwgaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICBjb25zdCBib29rc0hhbmRsZXIgPSBuZXcgYXBpZ3cuTGFtYmRhSW50ZWdyYXRpb24obmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnQm9va3NIYW5kbGVyJywge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1gsXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tSW5saW5lKGBleHBvcnRzLmhhbmRsZXIgPSAke2VjaG9IYW5kbGVyQ29kZX1gKSxcbiAgICB9KSk7XG5cbiAgICBjb25zdCBib29rSGFuZGxlciA9IG5ldyBhcGlndy5MYW1iZGFJbnRlZ3JhdGlvbihuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdCb29rSGFuZGxlcicsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUlubGluZShgZXhwb3J0cy5oYW5kbGVyID0gJHtlY2hvSGFuZGxlckNvZGV9YCksXG4gICAgfSkpO1xuXG4gICAgY29uc3QgaGVsbG8gPSBuZXcgYXBpZ3cuTGFtYmRhSW50ZWdyYXRpb24obmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnSGVsbG8nLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21JbmxpbmUoYGV4cG9ydHMuaGFuZGxlciA9ICR7aGVsbG9Db2RlfWApLFxuICAgIH0pKTtcblxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlndy5SZXN0QXBpKHRoaXMsICdib29rcy1hcGknLCB7IGNsb3VkV2F0Y2hSb2xlOiB0cnVlIH0pO1xuICAgIGFwaS5yb290LmFkZE1ldGhvZCgnQU5ZJywgaGVsbG8pO1xuXG4gICAgY29uc3QgYm9va3MgPSBhcGkucm9vdC5hZGRSZXNvdXJjZSgnYm9va3MnLCB7XG4gICAgICBkZWZhdWx0SW50ZWdyYXRpb246IGJvb2tzSGFuZGxlcixcbiAgICAgIGRlZmF1bHRNZXRob2RPcHRpb25zOiB7IGF1dGhvcml6YXRpb25UeXBlOiBhcGlndy5BdXRob3JpemF0aW9uVHlwZS5JQU0gfSxcbiAgICB9KTtcblxuICAgIGJvb2tzLmFkZE1ldGhvZCgnR0VUJyk7XG4gICAgYm9va3MuYWRkTWV0aG9kKCdQT1NUJyk7XG5cbiAgICBjb25zdCBib29rID0gYm9va3MuYWRkUmVzb3VyY2UoJ3tib29rX2lkfScsIHtcbiAgICAgIGRlZmF1bHRJbnRlZ3JhdGlvbjogYm9va0hhbmRsZXIsXG4gICAgICAvLyBub3RlIHRoYXQgYXV0aG9yaXphdGlvbiB0eXBlIGlzIGluaGVyaXRlZCBmcm9tIC9ib29rc1xuICAgIH0pO1xuXG4gICAgYm9vay5hZGRNZXRob2QoJ0dFVCcpO1xuICAgIGJvb2suYWRkTWV0aG9kKCdERUxFVEUnKTtcbiAgfVxufVxuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuXG5jb25zdCB0ZXN0Q2FzZSA9IG5ldyBCb29rU3RhY2soYXBwLCAncmVzdGFwaS1ib29rcy1leGFtcGxlJyk7XG5uZXcgSW50ZWdUZXN0KGFwcCwgJ3Jlc3RhcGktYm9va3MnLCB7XG4gIHRlc3RDYXNlczogW3Rlc3RDYXNlXSxcbn0pO1xuXG5mdW5jdGlvbiBlY2hvSGFuZGxlckNvZGUoZXZlbnQ6IGFueSwgXzogYW55LCBjYWxsYmFjazogYW55KSB7XG4gIHJldHVybiBjYWxsYmFjayh1bmRlZmluZWQsIHtcbiAgICBpc0Jhc2U2NEVuY29kZWQ6IGZhbHNlLFxuICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShldmVudCksXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoZWxsb0NvZGUoX2V2ZW50OiBhbnksIF9jb250ZXh0OiBhbnksIGNhbGxiYWNrOiBhbnkpIHtcbiAgcmV0dXJuIGNhbGxiYWNrKHVuZGVmaW5lZCwge1xuICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICBib2R5OiAnaGVsbG8sIHdvcmxkIScsXG4gIH0pO1xufVxuIl19