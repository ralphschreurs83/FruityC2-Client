/*
# Copyright (C) 2017 xtr4nge [_AT_] gmail.com
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function listener_add() {
    name = $("#add-listener-name").val();
    port = $("#add-listener-port").val();
    host = $("#add-listener-host").val();
	
	$.post( FruityC2+"/listener/add", { name: name, port: port, host: host } );
}

function listener_update() {
	id = $("#listener-id").val();
    name = $("#listener-name").val();
    host = $("#listener-host").val()
    
	$.post( FruityC2+"/listener/update", { id: id, name: name, host: host } );
}

function load_listener() {
	$("#container_listener").empty();
	
	content = "<div>";
	content += "<div style='display: inline-block; width: 20px;'></div>";
	content += "<div style='display: inline-block; width: 30px;'></div>";
	content += "<div style='display: inline-block; width: 100px; font-weight: bold;'>Status</div>";
	content += "<div style='display: inline-block; width: 100px; font-weight: bold;'>Port</div>";
	content += "<div style='display: inline-block; width: 150px; font-weight: bold;'>Name</div>";
	content += "<div style='display: inline-block; width: 100px; font-weight: bold;'>SSL</div>";
    content += "<div style='display: inline-block; width: 100px; font-weight: bold;'>Host</div>";
	content += "</div>";
	
	$("#container_listener").append(content);
	
	$.getJSON(FruityC2+"/listener", function(obj) {
        $.each(obj, function(key, value) {			
			if (value.open == true) {
				status = "<a href='#' style='color: #5cb85c' onclick='listener_set(\""+key+"\",\"stop\")'>enabled</a>";
			} else {
				status = "<a href='#' style='color: #d9534f' onclick='listener_set(\""+key+"\",\"start\")'>disabled</a>";
			}
			
			content = "<div id='listener_"+key+"'>";
			content += "<div style='display: inline-block; width: 20px;'><i class='fa fa-close' style='font-size:12px' onclick='listener_del("+key+")'></i></div>";
			content += "<div style='display: inline-block; width: 30px;'><i class='fa fa-cog' style='font-size:12px' data-toggle='modal' data-target='#mListener' onclick='listener_load("+key+")'></i></div>";
			content += "<div style='display: inline-block; width: 100px;'>"+status+"</div>";
			content += "<div style='display: inline-block; width: 100px;'>"+key+"</div>";
			content += "<div style='display: inline-block; width: 150px;'>"+value.name+"</div>";
			content += "<div style='display: inline-block; width: 100px;'>"+value.ssl+"</div>";
            content += "<div style='display: inline-block; w-idth: 100px;'>"+value.host+"</div>";
			content += "</div>";
			
			$("#container_listener").append(content);
        });
    });
}
//load_listener()

function listener_load(id) {
	if (id > 0) {
		$.getJSON(FruityC2+"/listener?id="+id, function(obj) {
			$("#listener-id").val(id);
			$("#listener-name").val(obj.name);
            $("#listener-host").val(obj.host);
            $("#listener-ssl").val(obj.ssl);
		});
	}
}

function listener_set(port,action) {
	$.getJSON(FruityC2+"/listener/"+port+"/"+action, function(obj) {
		load_listener();
	});
}

function listener_del(id) {
	if(confirm("Delete Listener?")) {
		$.get(FruityC2+"/listener/del/"+id, 'id=' + id, function(data) {});
		$("#listener_"+id).remove();
	} else {
		return false;
	}
}
