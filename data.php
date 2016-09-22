<?php

$addresses = array(
    array(
        'id' => 10,
        'street' => 'Ernst-Reinke-Str. 3',
        'PLZ' => '10369'
    ),
    array(
        'id' => 20,
        'street' => 'Albert-Einstein-Ring 2-6',
        'PLZ' => '14532'
    ),
);

$result = array();

foreach ($addresses as $address) {
    $addressString = trim($address['street']) . ',' . trim($address['PLZ']);
    $addressString = urlencode($addressString);

    $url = 'http://maps.google.com/maps/api/geocode/json?address=' . $addressString . '&sensor=false';

    $responseJson = file_get_contents($url);
    $response = json_decode($responseJson, true);

	if ($response['status'] != 'OK') {
    return null;
    }

    $geometry = $response['results'][0]['geometry'];
    $lat = $geometry['location']['lat'];
    $lon = $geometry['location']['lng'];

    $result[] = array(
        'id' => $address['id'],
        'lat' => $lat,
        'lon' => $lon,
    );
}

$result = json_encode($result);

$jsonTableStart = '{"addresses":';
$jsonTableEnd = '}';
$jsonTable = $jsonTableStart.$result.$jsonTableEnd;

die($jsonTable);
