package the.lidless.eye;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Scanner;

public class JsElementsReplacer implements JsHandler {

	private static final String REPLACE_PREFIX = "\\$\\{";
	private static final String REPLACE_POSTFIX = "\\}";

	private Map<String, String> replaceMap = new HashMap<>();
	
	public void setReplaces(Properties props) {
		while (props.propertyNames().hasMoreElements()) {
			String name = (String) props.propertyNames().nextElement();
			replaceMap.put(REPLACE_PREFIX + name + REPLACE_POSTFIX, props.getProperty(name));
		}
	}
	
	@Override
	public Reader handle(Reader in) throws IOException {
		Scanner scanner = new Scanner(in);
		String text = "";
		try {
			text = scanner.useDelimiter("\\A").next();
		} finally {
			scanner.close();
		}

		for (Entry<String, String> curEntry : replaceMap.entrySet()) {
			text = text.replaceAll(curEntry.getKey(), curEntry.getValue());
		}
		
		return new StringReader(text);
	}
	
}
