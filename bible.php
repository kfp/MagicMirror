<?php

function html_to_obj($html) {
    $dom = new DOMDocument();
    $dom->loadHTML($html);
    return element_to_obj($dom->documentElement);
}


  $key = "IP";
  $options = "include-footnotes=false&include-verse-numbers=false&include-audio-link=false&include-short-copyright=false";
  $url = "http://www.esvapi.org/v2/rest/verse?key=$key&$options";
  $ch = curl_init($url); 
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
  $response = curl_exec($ch);
  curl_close($ch);
  $dom = new DOMDocument();
  $dom->loadHTML($response);

  $bibleAttr = $dom->getElementsByTagName('h2')->item(0)->nodeValue;
  $biblePassage = $dom->getElementsByTagName('p')->item(0)->nodeValue;

  print $bibleAttr;
  

?>
