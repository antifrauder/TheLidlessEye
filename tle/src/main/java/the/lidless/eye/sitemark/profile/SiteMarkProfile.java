package the.lidless.eye.sitemark.profile;

import java.util.HashSet;
import java.util.Properties;
import java.util.Set;

public class SiteMarkProfile {

//	private Set<String> subTypes;
	private Set<String> constsToCut = new HashSet<>();
	private Set<String> funcsToCut = new HashSet<>();
	private Properties replaces;

//	public Set<String> getSubTypes() {
//		return subTypes;
//	}
//	public void setSubTypes(Set<String> subTypes) {
//		this.subTypes = subTypes;
//	}
	public Set<String> getConstsToCut() {
		return constsToCut;
	}
	public void setConstsToCut(Set<String> constsToCut) {
		this.constsToCut = constsToCut;
	}
	public Set<String> getFuncsToCut() {
		return funcsToCut;
	}
	public void setFuncsToCut(Set<String> funcsToCut) {
		this.funcsToCut = funcsToCut;
	}
	public Properties getReplaces() {
		return replaces;
	}
	public void setReplaces(Properties replaces) {
		this.replaces = replaces;
	}

}
