Feature: Test online calculator scenarios
Scenario Outline: Test subtraction, division and CE functionalities
Given Open chrome browser and start application
When I enter following values and press CE button
        	|value1 | value2 | operator|
        	|<value1> | <value2> | <operator>|
Then I should be able to see
            |	expected |<expected>|
Examples:
            | value1  		| value2 		| operator			| expected	|
            | 	2 			|   2			|		/			| 1			|
            | 	-2 			|   2			|		/			| -1		|
            | 	2 			|   0			|		/			| Error		|
            | 	0 			|   2			|		/			| 0			|
            | 	1 			|   1			|		+			| 2			|
            | 	-5 			|   6			|		+			| 1			|
            | 	-5			|   3			|		+			| -2		|
            | 	5 			|   3			|		-			| 2			|
            | 	1			|   3			|		-			| -2		|
            | 	-1			|   1			|		-			| -2		|