# Test-Environment

## Use to run the application:

	1. yarn install
	2. cd ios
	3. pod install
	4. yarn start
	3. yarn ios

## Problem Description:

    When we use hook useState with realm object re-render doesn't happen after realm object modified in DEBUG mode, but it does in RELEASE mode (see *useCount.js*) 
