SET SCHEMA "Elan";

DROP TABLE CUSTOMERS ;
CREATE COLUMN TABLE CUSTOMERS (
	ID 				INTEGER PRIMARY KEY,
	FIRST_NAME 		nvarchar(250) NULL,
	LAST_NAME 		nvarchar(250) NULL,	
	COMPANY_NAME 	nvarchar(250) NULL, 
	ADDRESS 		nvarchar(250) NULL,
	CITY 			nvarchar(250) NULL,		
   	COUNTRY 		nvarchar(250) NULL,	
	ZIP 			nvarchar(10)  NULL,
	PHONE 			nvarchar(30)  NULL,	
	EMAIL 			nvarchar(80)  NULL,
	WEB 			nvarchar(250) NULL
);

-- after import data to table
ALTER TABLE CUSTOMERS add ( TA_TOKEN nvarchar(500) GENERATED ALWAYS AS 
						    FIRST_NAME || ' ' || LAST_NAME || ' ' || COMPANY_NAME || ' ' ||
							ADDRESS || ' ' || CITY || ' ' || COUNTRY || ' '  || 
							ZIP || ' ' || PHONE || ' ' || EMAIL || ' ' || WEB ) ;


select * from CUSTOMERS ;

-- fulltext search / optimized for fuzzy search
Create FullText Index "FUZZY_SEARCH_INDEX" On "CUSTOMERS"("TA_TOKEN")
FUZZY SEARCH INDEX ON
FAST PREPROCESS on;

-- search
select TOP 30 TO_DECIMAL(SCORE(),3,2) AS score, * 
  from CUSTOMERS 
 where contains(TA_TOKEN, '' , FUZZY(0.6)) 
 ORDER BY score DESC
;




