function userCreate(param) { 
	
	var after 	= param.afterTableName; // 返回param 仅仅包含afterTableName
	var SelStmt = param.connection.prepareStatement('select * from "' + after + '"');
    var rs      = SelStmt.executeQuery();
	// 因为PERS_NO是自动生成的 所以我们只需要插入其他字段就可以了
    var InsStmt = param.connection.prepareStatement('insert into "User".UserDetails( firstname, lastname, e_mail) values(?, ?, ?)');
    
    // 遍历插入的数据 
    if (rs.next()) {
    	InsStmt.setString(1, rs.getString(2));
    	InsStmt.setString(2, rs.getString(3));
    	InsStmt.setString(3, 'lib:insert');
        // 插入数据
    	InsStmt.executeUpdate();
    	InsStmt.close();
    }
    // clean
    rs.close();
    SelStmt.close();    
}

function userUpdate(param) { 
	
    var after  = param.afterTableName;   // 更新后的临时表名称
    var before = param.beforeTableName;  // 更新前的临时表名称

    var SelStmt = param.connection.prepareStatement('select * from "' + after + '"');
    var rs      = SelStmt.executeQuery();
    var UpdStmt = 
    	param.connection.prepareStatement('update "User".UserDetails set firstname = ?, lastname = ?, e_mail = ? where PERS_NO = ?');
    
    if (rs.next()) {
        UpdStmt.setString(1, 'lib:update' );
        UpdStmt.setString(2, rs.getString(3) );
        UpdStmt.setString(3, rs.getString(4) );
        // 尽管PERS_NO是INT,但是如果getInt就会报错 如要使用getString
        UpdStmt.setString(4, rs.getString(1) );
        //  数据
        UpdStmt.executeUpdate();
        UpdStmt.close();
    }
    rs.close();
    SelStmt.close();
}

