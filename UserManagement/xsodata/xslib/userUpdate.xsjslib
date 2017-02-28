function userUpdate(param) { 

    var PERS_NO    ;
    var FIRSTNAME  ;
    var LASTNAME   ;
    var E_MAIL     ;
	
    var after  = param.afterTableName;
    var before = param.beforeTableName;
    
    // 获取更新以后数据(全部列)都存在after中
    // 如果需要更新前状态数据请用before  
    var pStmt = param.connection.prepareStatement('select * from "' + after + '"');
    
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	// 尽管PERS_NO是INT,但是如果getInt就会报错 如要使用getString
        PERS_NO   = rs.getString(1) ;
        FIRSTNAME = rs.getString(2) ;
        LASTNAME  = rs.getString(3) ;
        E_MAIL    = rs.getString(4) ;
        pStmt = param.connection.prepareStatement('update UserDetails set firstname = ?, lastname = ?, e_mail = ? where PERS_NO = ?');
        pStmt.setString(1, FIRSTNAME);
        pStmt.setString(2, LASTNAME);
        pStmt.setString(3, E_MAIL);
        pStmt.setString(4, PERS_NO);
        pStmt.executeUpdate();
        pStmt.close();
    }

    rs.close();

}
