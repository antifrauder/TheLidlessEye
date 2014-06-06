package the.lidless.eye.sitemark.profile;

import java.util.HashSet;
import java.util.Set;

public class SiteMarkSubTypeProfile {

	private Set<String> consts = new HashSet<>();
	private Set<String> funcs = new HashSet<>();

	public Set<String> getConsts() {
		return consts;
	}
	public void setConsts(Set<String> consts) {
		this.consts = consts;
	}
	public Set<String> getFuncs() {
		return funcs;
	}
	public void setFuncs(Set<String> funcs) {
		this.funcs = funcs;
	}
	
}
