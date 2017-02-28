
-- look up for created schema
select * from schemas where schema_name like '%Elan%';

-- grant the schema to i321482 (case-sensitive use '"Elan"')
CALL "GRANT_SCHEMA_PRIVILEGE_ON_ACTIVATED_CONTENT"('EXECUTE, SELECT, UPDATE, INSERT, CREATE ANY', '"Elan"', 'I321482');

-- grant the role to i321482
CALL GRANT_ACTIVATED_ROLE('i321482.roles::baseRole', 'I321482') 

-- create add trigger
CREATE TRIGGER "Elan"."add_insert_to_log"
AFTER INSERT ON "Elan"."i321482.sqls::Product.Products"
REFERENCING NEW ROW newrow FOR EACH ROW
BEGIN
  INSERT INTO "Elan"."i321482.sqls::Product.ProductLog"
  VALUES(:newrow."PRODUCTID", now(), CURRENT_USER, :newrow."PRODUCTID" || ' has been created');
END;

-- test add trigger (works)
INSERT into "Elan"."i321482.sqls::Product.Products" values( 'ProductA', 'Software', '299.99');
select * from "Elan"."i321482.sqls::Product.ProductLog" ;
select * from "Elan"."i321482.sqls::Product.Products" ;


-- create update trigger
CREATE TRIGGER "Elan"."add_update_price_to_log"
AFTER UPDATE ON "Elan"."i321482.sqls::Product.Products"
REFERENCING NEW ROW newrow, OLD ROW oldrow FOR EACH ROW
BEGIN
  declare lv_price_difference decimal(15,2) := 0;
  if :oldrow.price <> :newrow.price then
    lv_price_difference := :newrow.price - :oldrow.price;
    insert into "Elan"."i321482.sqls::Product.ProductLog"
    values (:newrow.PRODUCTID, now(), CURRENT_USER, :newrow.PRODUCTID || 
            ' has been updated with price difference of ' || to_decimal(:lv_price_difference, 15, 2));
  end if; 
END;

-- test update trigger
UPDATE "Elan"."i321482.sqls::Product.Products" SET PRICE = 399.99 WHERE PRODUCTID = 'ProductA';
select * from "Elan"."i321482.sqls::Product.ProductLog" ;
select * from "Elan"."i321482.sqls::Product.Products" ;


CALL "Elan"."i321482.procedures::get_bp_addresses_by_role"( im_partnerrole => '02', ex_bp_addresses => ? )


