/**
 *  Parses the given URL into its different components.
 *
 *  TODO: Implement this function.
 *  NOTE: You may implement additional functions as you need, as long as this
 *    function behaves as specified in the instructions. Have fun! :)
 **/
function parse(url) {
	var parsed = {
		scheme: null,
		authority: {
			username: null,
			password: null,
			host: null,
			port: null,
		},
		path: null,
		query: null,
		fragment: null,
	}

	var decodedURL = decodeURIComponent(url)

	element = document.createElement('a')
	element.href = decodedURL

	parsed.scheme = element.protocol.replace(":","")
		
	parsed.authority = getAuth(url)

	//removes "://" for path checking
	if(decodedURL.includes("://")){
		decodedURL = decodedURL.replace("://","")
	}

	//path parsing
	if(decodedURL.includes("/"))	
		parsed.path = decodeURIComponent(element.pathname)
	else
		parsed.path = ""

	//query parsing
	if(element.search == ""){
		parsed.query = null
	}
	else{
		parsed.query = getQuery(element.search.replace("?", ""))
	}

	//fragment parsing
	if(element.hash == ""){
		parsed.fragment = null
	}
	else{
		parsed.fragment = element.hash.replace("#","")
	}

	return parsed
}

function getAuth(url) {
	var temp, auth, tempHost
	var authority = {
			username: null,
			password: null,
			host: null,
			port: null,
		}

	element = document.createElement('a')
	element.href = decodeURIComponent(url)

	if(element.port == ""){
		if(element.protocol == "http:"){
			authority.port = "80"
		}
		else if(element.protocol == "https:"){
			authority.port = "443"
		}
		else if(element.protocol == "ftp:"){
			authority.port = "21"
		}
		else if(element.protocol == "ssh"){
			authority.port = "22"
		}
		else{
			authority.port = null
		}
	}

	else{
		authority.port = element.port
	}

	if(url.includes("://")){
		temp = url.split("://")[1]
	}
	else if(url.includes(":/")){
		temp = url.split(":/")[1]
	}

	auth = temp.split("/")[0]

	if(auth.split("@")[1] == undefined){
		authority.username = null
		authority.password = null
	}
	else{
		authentication = auth.split("@")[0].split(":")

		authority.username = decodeURIComponent(authentication[0])
		authority.password = decodeURIComponent(authentication[1])
	}
	
	if(element.hostname == ""){
		authority.host = null
	}
	else{
		authority.host = element.hostname
	}	
	
	return authority
}

function getQuery(query) {
	var qset = query.split("&")
	var q = {}

	for(var x = 0; x < qset.length; x++){
		q[decodeURIComponent(qset[x].split("=")[0])] = decodeURIComponent(qset[x].split("=")[1])
	}

	return q
}