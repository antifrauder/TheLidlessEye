package the.lidless.eye;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

public class JsObfuscator implements JsHandler {

	@Override
	public Reader handle(Reader in) throws IOException {

		BufferedReader bufferedIn = new BufferedReader(in);
		String resText = "";
		String curStr = null;
		while ((curStr = bufferedIn.readLine()) != null) {
			resText += curStr.replaceAll(" ", "");;
		}
		
		return new StringReader(resText);
	}

}
