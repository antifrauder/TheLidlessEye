package the.lidless.eye;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.HashSet;
import java.util.Set;

public class JsElementsCutter implements JsHandler {

	private static final String CONST_DEF_PATTERN_HEAD = "this.";
	private static final String CONST_DEF_PATTERN_TAIL = " = ";

	private static final String FUNC_DEF_PATTERN_HEAD = "this.";
	private static final String FUNC_DEF_PATTERN_TAIL = " = function(";
	
	private static final String FUNC_CALL_PATTERN_HEAD = "this.";
	private static final String FUNC_CALL_PATTERN_TAIL = "(";
	
	private Set<String> constDefsToCut = new HashSet<>();
	private Set<String> funcDefsToCut = new HashSet<>();
	private Set<String> funcCallsToCut = new HashSet<>();

	public void setConstsToCut(Set<String> constsToCut) {
		for (String curConst : constsToCut) {
			constDefsToCut.add(CONST_DEF_PATTERN_HEAD + curConst + CONST_DEF_PATTERN_TAIL);
		}
	}

	public void setFuncsToCut(Set<String> funcsToCut) {
		for (String curFunc : funcsToCut) {
			funcDefsToCut.add(FUNC_DEF_PATTERN_HEAD + curFunc + FUNC_DEF_PATTERN_TAIL);
			funcCallsToCut.add(FUNC_CALL_PATTERN_HEAD + curFunc + FUNC_CALL_PATTERN_TAIL);
		}
	}

	@Override
	public Reader handle(Reader in) throws IOException {
		BufferedReader bufferedIn = new BufferedReader(in);
		String resText = "";
		String curStr = null;
		while ((curStr = bufferedIn.readLine()) != null) {
			if (isContainsConstDefToCut(curStr))
				continue;
			if (isContainsFuncCallToCut(curStr))
				continue;
			if (isContainsFuncDefsToCut(curStr)) {
				skipFuncBody(curStr, bufferedIn);
			}
			resText += curStr;
		}
		
		return new StringReader(resText);
	}

	private boolean isContainsOneFromStringSet(String str, Set<String> strSet) {
		boolean res = false;
		for (String curStr : strSet) {
			if (str.contains(curStr)) {
				return true;
			}
		}
		return res;
	}

	private boolean isContainsConstDefToCut(String str) {
		return isContainsOneFromStringSet(str, constDefsToCut);
	}
	
	private boolean isContainsFuncCallToCut(String str) {
		return isContainsOneFromStringSet(str, funcCallsToCut);
	}
	
	private boolean isContainsFuncDefsToCut(String str) {
		return isContainsOneFromStringSet(str, funcDefsToCut);
	}
	
	private void skipFuncBody(String firstStr, BufferedReader in) throws IOException {
		int bracketDepth = countBracketDepthInStr(firstStr, 0);
		String curStr = null;
		while ((curStr = in.readLine()) != null) {
			bracketDepth = countBracketDepthInStr(curStr, bracketDepth);
			if (bracketDepth <= 0)
				break;
		}
	}
	
	private int countBracketDepthInStr(String str, int currentBracketDepth) {
		int bracketDepth = currentBracketDepth;
		for (int i = 0; i < str.length(); i ++) {
			if (str.charAt(i) == '{') {
				bracketDepth++;
			}
			if (str.charAt(i) == '}') {
				bracketDepth--;
			}
		}
		return bracketDepth;
	}

}
