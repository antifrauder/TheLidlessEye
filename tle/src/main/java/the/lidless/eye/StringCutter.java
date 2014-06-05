package the.lidless.eye;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class StringCutter {

	private Set<String> constDefsToCut = new HashSet<>();
	private Set<String> funcCallsToCut = new HashSet<>();
	private Set<String> funcDefsToCut = new HashSet<>();
	
	private boolean checkConstDefs(String str) {
		boolean res = false;
		for (String curConstDef : constDefsToCut) {
			if (str.contains("this." + curConstDef + " = ")) {
				return true;
			}
		}
		return res;
	}
	
	public BufferedReader cutText(BufferedReader in) throws IOException {

		String res = "";
		
		String curStr = null;
		while ((curStr = in.readLine()) != null) {
			checkConstDefs(curStr);
		}
		
		return null;
	}

}
