package the.lidless.eye.sitemark.profile;

<<<<<<< HEAD
import java.util.HashSet;
=======
>>>>>>> 2bdbfffe1b19643922bac050182631fe7c96427d
import java.util.Properties;
import java.util.Set;

public class SiteMarkProfile {

<<<<<<< HEAD
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

=======
	private Set<String> subTypes;
	private Set<String> constsToCut;
	private Set<String> funcsToCut;
	private Properties replaces;

>>>>>>> 2bdbfffe1b19643922bac050182631fe7c96427d
}
